import React from "react";
import { getCategoryProps } from "../../../../utils/category";

const Prices = ({ priceItems }) => {
  if (priceItems === undefined || priceItems.length === 0)
    return <p>Nema podataka o cijeni.</p>;

  return (
    <table className="container__prices">
      <thead>
        <tr className="prices__row">
          <th className="row__cell row__cell--title">Category</th>
          <th className="row__cell row__cell--title">Price</th>
          <th className="row__cell row__cell--title">Lessons</th>
        </tr>
      </thead>
      <tbody>
        {priceItems.map(priceItem => (
          <tr key={priceItem.id} className="prices__row">
            <td className="row__cell">{priceItem.category}</td>
            <td className="row__cell">{priceItem.price} KN</td>
            <td className="row__cell">
              {getCategoryProps(priceItem.category) == null ? null : getCategoryProps(priceItem.category).drivingLessons}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Prices;
