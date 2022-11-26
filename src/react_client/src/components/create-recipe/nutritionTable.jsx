import React from "react";

const NutritionTable = ({nutritionTable}) => {
  return (
    <table>
      <caption>Nutrition: Per serving</caption>
      <thead>
      </thead>
      {/* <tbody>

      </tbody> */}
      <tbody className="key-value-blocks__batch body-copy-extra-small">
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">KCAL</td>
          <td className="key-value-blocks__value">{nutritionTable.kcal.amount}</td>
        </tr>
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">FAT</td>
          <td className="key-value-blocks__value">{nutritionTable.fat.amount}{nutritionTable.fat.unit}</td>
        </tr>
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">SATURATES</td>
          <td className="key-value-blocks__value">{nutritionTable.saturates.amount}{nutritionTable.saturates.unit}</td>
        </tr>
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">CARBS</td>
          <td className="key-value-blocks__value">{nutritionTable.carbs.amount}{nutritionTable.carbs.unit}</td>
        </tr>
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">SUGARS</td>
          <td className="key-value-blocks__value">{nutritionTable.sugars.amount}{nutritionTable.sugars.unit}</td>
        </tr>
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">FIBRE</td>
          <td className="key-value-blocks__value">{nutritionTable.fibre.amount}{nutritionTable.fibre.unit}</td>
        </tr>
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">PROTEIN</td>
          <td className="key-value-blocks__value">{nutritionTable.protein.amount}{nutritionTable.protein.unit}</td>
        </tr>
        <tr className="key-value-blocks__item">
          <td className="key-value-blocks__key">SODIUM</td>
          <td className="key-value-blocks__value">{nutritionTable.sodium.amount}{nutritionTable.sodium.unit}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NutritionTable;
