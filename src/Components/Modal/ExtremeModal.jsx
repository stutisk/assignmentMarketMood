import React, { useState } from "react";

export const ExtremeModal = ({ isVisible, content, style }) => {
  if (!isVisible) return null;
  return (
    <section className="modal" style={style}>
      <div>{content}</div>
    </section>
  );
};
