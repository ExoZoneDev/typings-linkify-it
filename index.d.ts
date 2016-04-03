interface LinkifyIt {
  (schemes: ISchemas, options: IOptions): LinkifyItInstace;
  (options: IOptions): LinkifyItInstace;
}

interface LinkifyItInstace {
  /**
   * Set recognition options for links without schema.
   */
  set(options: IOptions): this;
  /**
   * Searches linkifiable pattern and returns `true` on success or `false` on fail.
   */
  test(text: string): boolean;
  /**
   * Very quick check, that can give false positives. Returns true if link MAY BE can exists. Can be used for speed optimization,
   * when you need to check that link NOT exists.
   */
  pretest(text: string): boolean;
  /**
   * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly at given position. Returns length of found pattern (0 on fail).
   */
  testSchemaAt(text: string, schema: string, pos: number): number;
  /**
   *  Returns array of found link descriptions or `null` on fail. We strongly recommend to use [[LinkifyIt#test]] first, for best speed.
   */
  match(text: string): IMatchedResult;
  /**
   * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix) to avoid false positives. By default this algorythm used:
   */
  tlds(list: string[], keepOld?: boolean);
  /**
   * Default normalizer (if schema does not define it's own).
   */
  normalize(match: IMatchedResult): void;
}

interface ISchemas {
  http: string | ISchemaOption;
  https: string | ISchemaOption;
  ftp: string | ISchemaOption;
  "//": string | ISchemaOption;
  mailto: string | ISchemaOption;
}

interface ISchemaOption {
  validate: (text: string, pos: number, self: LinkifyIt) => number | RegExp;
}

interface IOptions {
  fuzzyLink?: boolean;
  fuzzyEmail?: boolean;
  fuzzyIP?: boolean;
}

interface IMatchedResult {
  index: number;
  lastIndex: number;
  raw: string;
  schema: string;
  text: string;
  url: string;
}

export = LinkifyIt;