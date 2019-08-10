interface ScriptSource {
  src?: string;
  extension?: string;
  version?: string;
}

export default ({
  src = '',
  extension = '',
  version = 'latest',
}: ScriptSource): string => {
  if (src) {
    return src;
  }

  return `https://cdn.ampproject.org/v0/${extension}-${version}.js`;
};
