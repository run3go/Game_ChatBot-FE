export default function highlightText(text: string) {
  const parts = text
    .split(/(\+?[\d]+\.?\d*%?)|(증가|감소|획득?)|('[^']+'|"[^"]+")/)
    .filter(Boolean);

  return parts.map((part, i) => {
    if (/^[\d]+\.?\d*초?$/.test(part))
      return (
        <span key={i} className="text-[#dac04d]">
          {part}
        </span>
      );
    if (/^\+?[\d]+\.?\d*%?$/.test(part))
      return (
        <span key={i} className="text-[#56c558]">
          {part}
        </span>
      );
    if (/^['"][^'"]+['"]$/.test(part))
      return (
        <span key={i} className="text-[#a185d0]">
          {part}
        </span>
      );
    return part;
  });
}
