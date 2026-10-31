import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { en } from "../src/shared/locales/en";
import { translate, type Language } from "../src/shared/locales";

const localeFiles: Array<[Language, string]> = [
  ["es", "es.ts"], ["de", "de.ts"], ["fr", "fr.ts"], ["pt-BR", "ptBR.ts"],
];

function englishKeys(value: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const name = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" ? englishKeys(child as Record<string, unknown>, name) : [name];
  });
}

function declaredKeys(file: string): string[] {
  const source = ts.createSourceFile(file, readFileSync(path.resolve("src/shared/locales", file), "utf8"), ts.ScriptTarget.Latest, true);
  let root: ts.ObjectLiteralExpression | undefined;
  function find(node: ts.Node): void {
    if (ts.isCallExpression(node) && node.expression.getText(source) === "createLocale" && ts.isObjectLiteralExpression(node.arguments[0])) {
      root = node.arguments[0];
    }
    ts.forEachChild(node, find);
  }
  find(source);
  if (!root) throw new Error(`Missing createLocale in ${file}`);
  function keys(node: ts.ObjectLiteralExpression, prefix = ""): string[] {
    return node.properties.flatMap((property) => {
      if (!ts.isPropertyAssignment(property)) return [];
      const name = prefix ? `${prefix}.${property.name.getText(source)}` : property.name.getText(source);
      return ts.isObjectLiteralExpression(property.initializer) ? keys(property.initializer, name) : [name];
    });
  }
  return keys(root);
}

describe("new locale coverage", () => {
  const expected = englishKeys(en).filter((key) => key !== "common.appName").sort();
  for (const [language, file] of localeFiles) {
    it(`${language} supplies every interface message and preserves placeholders`, () => {
      expect(declaredKeys(file).sort()).toEqual(expected);
      for (const key of expected) {
        const placeholders = (message: string) => (message.match(/\{\w+\}/g) ?? []).sort();
        expect(placeholders(translate(key, language)), key).toEqual(placeholders(translate(key, "en")));
      }
    });
  }
});
