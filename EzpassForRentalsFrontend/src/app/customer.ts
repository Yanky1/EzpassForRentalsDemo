export class Customer {
    constructor(
      public name: string,
      public plates: string,
      public creditCard: string,
      public exp: string,
      public code: string,
      public dateIn: Date,
      public dateOut: Date,
      public id?: number
    ) {}
    
  }