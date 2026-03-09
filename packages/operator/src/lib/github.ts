const HEADERS = { 'User-Agent': 'operator-cli' };

export type GithubItem = {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
};

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

export async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

export async function fetchGithubContents(
  repo: string,
  path: string,
  ref: string,
): Promise<GithubItem[]> {
  const url = `https://api.github.com/repos/${repo}/contents/${path}?ref=${ref}`;
  const data = await fetchJson<GithubItem | GithubItem[]>(url);
  return Array.isArray(data) ? data : [data];
}

export async function fetchAllFiles(
  repo: string,
  path: string,
  ref: string,
): Promise<Array<{ repoPath: string; content: string }>> {
  const items = await fetchGithubContents(repo, path, ref);
  const results: Array<{ repoPath: string; content: string }> = [];

  for (const item of items) {
    if (item.type === 'dir') {
      const nested = await fetchAllFiles(repo, item.path, ref);
      results.push(...nested);
    } else if (item.download_url) {
      const content = await fetchText(item.download_url);
      results.push({ repoPath: item.path, content });
    }
  }

  return results;
}
