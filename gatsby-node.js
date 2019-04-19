const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

/**
 * Gatsbyの各種データが生成されるタイミングで
 * ノードに対して新たなデータを追加する
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    createNodeFieldsOfMarkdownRemark({ node, getNode, actions })
  }
}

/**
 * データを元にページを生成する
 */
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              group
              name
              template
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, group, template } = node.fields

    // テンプレートが存在しない場合はエラー
    if (!template) {
      console.error(`error! required template. slug=${slug}`)
      return
    }

    switch (group) {
      case "books":
        createPagesOfBooksGroup(node, actions)
        break
    }
  })
}

/**
 * Booksグループのページを生成する
 */
function createPagesOfBooksGroup(node, actions) {
  const { createPage } = actions
  const { slug, template, name } = node.fields

  // contextの変数はページ内のGraphQLで利用可能な変数として渡されます。
  const context = { slug }

  // Bookの時はBookに含まれるNoteを検索するためのパラメータを追加
  if (name === "index") {
    const regSlug = `/^${slug}[0-9]+/$/`
    context.regSlug = regSlug
  }
  // Noteの時は、親のBookの情報を検索するためのパラメーターを追加
  else {
    const bookSlug = "/" + Object.values(splitSlug(slug)).join("/") + "/"
    context.bookSlug = bookSlug
  }

  createPage({
    path: slug,
    component: path.resolve(template),
    context,
  })
}

/**
 * MarkdownRemakNodeにFieldを以下のフィールドを追加する
 * slug     : URLに使用されるslug
 * group    : Markdownのグループ名
 * name     : Markdownのファイル名
 * template : 対応するテンプレートコンポーネントのパス(./src~)
 */
function createNodeFieldsOfMarkdownRemark(data) {
  const { node, getNode, actions } = data
  const { createNodeField } = actions

  // Fieldに追加したい情報を生成
  const slug = createFilePath({ node, getNode, basePath: `pages` })
  const group = splitSlug(slug).group
  const category = splitSlug(slug).category
  const varity = splitSlug(slug).varity
  const name = getFileName(node.fileAbsolutePath)
  const template = getTemplateComponentPath(group, name)

  // Fieldを追加
  createNodeField({ node, name: `slug`, value: slug })
  createNodeField({ node, name: `group`, value: group })
  createNodeField({ node, name: `category`, value: category })
  createNodeField({ node, name: `varity`, value: varity })
  createNodeField({ node, name: `name`, value: name })
  createNodeField({ node, name: `template`, value: template })
}

/**
 * ファイルパスからファイル名のみを取得する
 */
function getFileName(filepath) {
  return path.basename(filepath, path.extname(filepath))
}

/**
 * Slugを分割して各階層をgroup、categoryに分類した結果を取得する
 */
function splitSlug(slug) {
  const splited = slug.substring(1).split("/")

  return {
    group: splited[0],
    category: splited[1],
    varity: splited[2],
  }
}

/**
 * グループと名前から適用するテンプレートコンポーネントのパスを取得する
 * @param {*} group
 * @param {*} name
 */
function getTemplateComponentPath(group, name) {
  let template = ""
  if (group === "books") {
    const isNameIndex = name === "index"
    template = isNameIndex ? "Book" : "Note"
  }

  if (!template) return ""

  return `./src/components/templates/${template}/index.js`
}
