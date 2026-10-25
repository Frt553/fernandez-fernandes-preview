# Prévia Fernández & Fernandes

Versão estática para apresentar o site ao cliente no GitHub Pages. Inclui a home e páginas de solução marcadas como **em construção**. Esta cópia não executa PHP.

## Publicar no GitHub Pages

1. Crie um repositório e envie o conteúdo desta pasta para a raiz do repositório.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Abra o endereço fornecido pelo GitHub Pages.

Para testar localmente, execute `python -m http.server 8081` nesta pasta e abra `http://127.0.0.1:8081/`.

A versão PHP para a HostGator continua na pasta `deploy`, fora deste repositório. Para atualizar esta prévia após mudanças, execute `php build-github-preview.php` na pasta acima.

**Estado da prévia:** as páginas internas e os artigos ainda estão em construção. Não use este repositório como site definitivo.
