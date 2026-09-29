import { MarketingProofFrame, SyntaxCode } from "@hraness/design-kit/react/server";
import { inferSyntaxLanguage, resolveSyntaxLanguage } from "@hraness/design-kit/syntax-highlighting";

export function CodeBlock({ code, language = "shell" }: Readonly<{ code: string; language?: string }>) {
  const syntaxLanguage = language.trim() === "" ? inferSyntaxLanguage(code) : resolveSyntaxLanguage(language);
  const content = <pre className="code-block" tabIndex={0}><SyntaxCode code={code} language={syntaxLanguage} styles="classes" /></pre>;
  return syntaxLanguage === "shell"
    ? <MarketingProofFrame className="terminal-frame" title="Terminal">{content}</MarketingProofFrame>
    : content;
}
