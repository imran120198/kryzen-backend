const { DataTypes } = require("sequelize");
const seq = require("../Connection/connection");

// Define User model
const UserModel = seq.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const ProductModel = seq.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

ProductModel.belongsTo(UserModel, { foreignKey: "user_id" });

(async () => {
  await seq.sync();
  console.log("Models were synchronized successfully.");
})();

module.exports = { UserModel, ProductModel };
