interface TestInterface {
  testField: string;
}

export default class Test {
  constructor(private testField) {
    console.log('Test field: ', this.testField);
  }
}
