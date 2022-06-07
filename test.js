import {expect} from 'chai';
import {Products, Aliments, Furniture, Person, Cashier, Customer, AddCos, VerificaCos, GolesteCos, erori} from './tema.js';

describe("Teste adaugare in cos", function() {
  it("verifica Mobila", function() {
      expect(AddCos(new Furniture("scaun", 150, "rosu"))).to.be.eq(1);
  })

  it("verifica Produs valid", function() {
      expect(AddCos(new Aliments("branza", 15, new Date(), 150))).to.be.eq(1);
  })

  it("verifica Produs expirat", function() {
      expect(() => AddCos(new Aliments("branza", 15, new Date('1/2/22'), 150))).to.throw();
  })
})

describe("Teste plata la casier", function() {
  it("Suficienti bani", function() {
      expect(VerificaCos(new Customer(50, [new Aliments("branza", 15, new Date(), 150),
                                          new Aliments("branza", 15, new Date(), 150),
                                          new Aliments("branza", 15, new Date(), 150)]))).to.be.eq(true);
  })

  it("Insuficienti bani", function() {
    expect(() => VerificaCos(new Customer(50, [new Aliments("branza", 15, new Date(), 150),
                                        new Aliments("branza", 15, new Date(), 150),
                                        new Aliments("branza", 15, new Date(), 150),
                                        new Aliments("branza", 15, new Date(), 150)]))).to.throw();
  })

})


describe("Teste golire cos", function() {
  it("Goleste Cos", function() {
    expect(GolesteCos()).to.be.eql([0, 18])
  })
})
