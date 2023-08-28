import { compile } from "mathjs";
import { getRandomValue } from "@/utils";

export class BisectionMethod {
  constructor(
    private readonly fx: string,
    private readonly e: number,
  ) {}

  private randomiseGuessing(range: number) {
    const f = compile(this.fx).evaluate;

    function randomiseGuessing(x0: number, x1: number) {
      if (f({ x: x0 }) * f({ x: x1 }) < 0) return [x0, x1];
      else
        return randomiseGuessing(getRandomValue(range), getRandomValue(range));
    }

    return randomiseGuessing(getRandomValue(range), getRandomValue(range));
  }

  private checkIntegrity(x0: number, x1: number) {
    const f = compile(this.fx).evaluate;

    return f({ x: x0 }) * f({ x: x1 }) < 0;
  }

  findRoots(guess1: number, guess2?: number) {
    let [x0, x1] = guess2 ? [guess1, guess2] : this.randomiseGuessing(guess1);

    const result = { x0, x1 };

    if (!this.checkIntegrity(x0, x1)) throw new Error("Invalid guessing");

    let x2 = (x0 + x1) / 2;

    const f = compile(this.fx).evaluate;

    while (x0.toPrecision(this.e) !== x1.toPrecision(this.e)) {
      x2 = (x0 + x1) / 2;

      if (f({ x: x2 }) * f({ x: x0 }) < 0) x1 = x2;
      else if (f({ x: x2 }) * f({ x: x1 }) < 0) x0 = x2;
    }

    return {
      ...result,
      root: x2,
      error: this.e,
    };
  }
}
