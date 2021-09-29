import { ISource } from "../Interfaces/ISources";

export class Source implements ISource {
    private id: number;
    private credibilityRank: number;
    private uncredibilityRank: number;
    private credibilitySum: number;
    private popularityRank: number;
    private name: string;

    public set Id (value: number) {
        this.id = value;
    }
    public get Id(): number {
        return this.id;
    }
    public set CredibilityRank (value: number) {
        this.credibilityRank = value;
    }
    public get CredibilityRank(): number {
        return this.credibilityRank;
    }
    public set CredibilitySum (value: number) {
      this.credibilitySum = value;
    }
    public get CredibilitySum(): number {
        return this.credibilitySum;
    }
    public set UncredibilityRank (value: number) {
      this.uncredibilityRank = value;
    }
    public get UncredibilityRank(): number {
      return this.uncredibilityRank;
    }
    public set PopularityRank (value: number) {
        this.popularityRank = value;
    }
    public get PopularityRank(): number {
        return this.popularityRank;
    }
    public set Name (value: string) {
        this.name = value;
    }
    public get Name(): string {
        return this.name;
    }

    public CredibilityValue() {
      return this.credibilityRank / (this.credibilityRank + this.uncredibilityRank) * 100;
    }
    public UncredibilityValue() {
      return this.uncredibilityRank / (this.credibilityRank + this.uncredibilityRank) * 100;
    }
    public VoteCount() {
      return this.uncredibilityRank + this.credibilityRank;
    }

    constructor(id: number, name: string, popularityRank: number, credibilityRank: number, uncredibilityRank: number, credibilitySum: number) {
      this.id = id;
      this.popularityRank = popularityRank;
      this.credibilityRank = credibilityRank;
      this.uncredibilityRank = uncredibilityRank;
      this.credibilitySum = credibilitySum;
      this.name = name;
    }
}