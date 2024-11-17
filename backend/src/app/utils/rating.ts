export class Rating {
  private _overall: number;
  private _inclusivity: number;
  private _safety: number;

  constructor(overall = 0, inclusivity = 0, safety = 0) {
    this.overall = overall;
    this.inclusivity = inclusivity;
    this.safety = safety;
  }

  set overall(value: number) {
    this.setRating('overall', value);
  }

  get overall(): number {
    return this._overall;
  }

  set inclusivity(value: number) {
    this.setRating('inclusivity', value);
  }

  get inclusivity(): number {
    return this._inclusivity;
  }

  set safety(value: number) {
    this.setRating('safety', value);
  }

  get safety(): number {
    return this._safety;
  }

  private setRating(type: 'overall' | 'inclusivity' | 'safety', value: number): void {
    if (value < 1 || value > 5) {
      throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} rating must be between 1 and 5.`);
    }
    this[`_${type}`] = value;
  }
}
