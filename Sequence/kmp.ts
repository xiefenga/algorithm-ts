function kmp(text: string, pattern: string): number {
  const tLen = text.length,
    pLen = pattern.length;
  if (tLen < pLen) {
    return -1;
  } else if (pLen === 0) {
    return 0;
  }
  const next: number[] = getNext(pattern);
  let ti = 0, pi = 0;
  while (pi < pLen && ti < tLen) {
    if (pi < 0 || text[ti] === pattern[pi]) {
      ti++;
      pi++;
    } else {
      pi = next[pi];
    }
  }
  return pi === pLen ? ti - pi : -1;
}

function getNext(pattern: string): number[] {
  const len = pattern.length;
  const next: number[] = [];
  let i = 0;
  let n = next[i] = -1;
  let imax = len - 1;
  while (i < imax) {
    if (n < 0 || pattern[i] === pattern[n]) {
      next[++i] = ++n;
    } else {
      n = next[n];
    }
  }
  return next;
}

export default kmp