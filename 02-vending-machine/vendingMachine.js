class VendingMachine {
  products;
  denominations;
  selectedProduct = null;
  insertedBalance = 0;

  constructor() {
    this.denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];
    this.products = [
      {
        id: 1,
        name: "water",
        price: 20,
      },
      {
        id: 2,
        name: "chocolate",
        price: 40,
      },
      {
        id: 3,
        name: "sprite",
        price: 50,
      },
    ];
  }

  selectProduct(name) {
    const product = this.products.find((product) => product.name === name);

    if (!product) {
      return {
        ok: false,
        message: "Product not found",
      };
    }

    this.selectedProduct = product;
    this.products = this.products.filter((p) => p.id !== product.id);

    return {
      ok: true,
      message: `Please insert Bills: ${product.price}`,
    };
  }

  insertBill(bill) {
    if (!Number.isInteger(bill) || bill <= 0 || !this.denominations.includes(bill)) {
      return {
        ok: false,
        message: `Unkown bill, Please insert a bill from: ${this.denominations.join(
          ", "
        )}`,
      };
    }

    this.insertedBalance += bill;

    if (this.selectedProduct.price <= this.insertedBalance) {
      return this.dispense();
    } else {
      return {
        ok: true,
        message: `Please insert ${
          this.selectedProduct.price - this.insertedBalance
        } more...`,
      };
    }
  }

  dispense() {
    if (this.insertedBalance > this.selectedProduct.price) {
      const change = this.returnChange();

      return {
        ok: true,
        message: `Prduct Dispensed, Collect your change: ${change.join(", ")}`,
      };
    }

    return {
      ok: true,
      message: "Product Dispensed, Collect the product...",
    };
  }

  returnChange() {
    const change = [];
    let changeToReturn = this.insertedBalance - this.selectedProduct.price;

    for (const note of this.denominations) {
      while (changeToReturn >= note) {
        change.push(note);
        changeToReturn = changeToReturn - note;
      }
    }

    return change;
  }

  reStock(product) {
    const isExist = this.products.find((p) => p.id == product.id);

    if (isExist) {
      return {
        ok: false,
        message: "Product already exists.",
      };
    }

    this.products.push(product);

    return {
      ok: true,
      message: "Product added successfully.",
    };
  }
}



// const vm = new VendingMachine();

// console.log(vm.selectProduct("water"));
// console.log(vm.insertBill(10));
// console.log(vm.insertBill(100));