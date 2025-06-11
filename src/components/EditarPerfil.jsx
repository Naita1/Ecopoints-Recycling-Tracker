import "../styles/EditarPerfil.css"

import React, { useState, useEffect } from "react";

function convertDDMMYYYYtoISO(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [dd, mm, yyyy] = parts;
    return `${yyyy}-${mm}-${dd}`;
  }
  return "";
}

function convertISOtoDDMMYYYY(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [yyyy, mm, dd] = parts;
    return `${dd}-${mm}-${yyyy}`;
  }
  return "";
}

export default function EditarPerfil({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    username: "",
    birthdate: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      username: user.username || "",
      birthdate: user.birthdate
        ? convertDDMMYYYYtoISO(user.birthdate)
        : "",
      city: user.city || "",
      phone: user.phone || "",
    });
  }, [user]);

  const validate = () => {
    const errs = {};
    if (!formData.username.trim()) errs.username = "Nome é obrigatório.";
    if (!formData.birthdate) errs.birthdate = "Data de nascimento é obrigatória.";
    if (!formData.city.trim()) errs.city = "Cidade é obrigatória.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Só números no telefone
    if (name === "phone" && value && !/^\d*$/.test(value)) return;

    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedBirthdate = convertISOtoDDMMYYYY(formData.birthdate);

    onSave({
      ...user,
      username: formData.username.trim(),
      birthdate: formattedBirthdate,
      city: formData.city.trim(),
      phone: formData.phone,
    });
  };

  return (
    <section className="editar-perfil-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="editar-perfil-form" noValidate>
        <label>
          Nome de usuário*:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            aria-invalid={!!errors.username}
            aria-describedby="error-username"
          />
          {errors.username && (
            <span className="error-msg" id="error-username">
              {errors.username}
            </span>
          )}
        </label>

        <label>
          Data de nascimento*:
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
            aria-invalid={!!errors.birthdate}
            aria-describedby="error-birthdate"
          />
          {errors.birthdate && (
            <span className="error-msg" id="error-birthdate">
              {errors.birthdate}
            </span>
          )}
        </label>

        <label>
          Cidade*:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            aria-invalid={!!errors.city}
            aria-describedby="error-city"
          />
          {errors.city && (
            <span className="error-msg" id="error-city">
              {errors.city}
            </span>
          )}
        </label>

        <label>
          Telefone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Somente números"
            maxLength={15}
          />
        </label>

        <div className="editar-perfil-buttons">
          <button type="submit" className="btn-save">
            Salvar
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
