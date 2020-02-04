import React from "react";
import { useTranslation } from "react-i18next";
export default function CardLayout({ title, description, children }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-header card-header-info">
        <h4 className="card-title ">{t(title)}</h4>
        <p className="card-category">{t(description)}</p>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}
