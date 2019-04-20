import _ from "lodash"

export class Node {
  constructor(node) {
    this.html = _.get(node, "html", "")
    this.title = _.get(node, "frontmatter.title", "")
    this.desc = _.get(node, "frontmatter.desc", "")
    this.date = _.get(node, "frontmatter.date", "")
    this.img = _.get(node, "frontmatter.img", "")
    this.slug = _.get(node, "fields.slug")
    this.group = _.get(node, "fields.group", "")
    this.category = _.get(node, "fields.category", "")
    this.varity = _.get(node, "fields.varity", "")
    this.name = _.get(node, "fields.name", "")
    this.template = _.get(node, "fields.template", "")
  }

  get isNote() {
    return this.group === "books" && this.name !== "index"
  }

  get isBook() {
    return this.group === "books" && this.name === "index"
  }
}

export function createNode(node) {
  return new Node(node)
}

/**
 * groupがbooksでnameがindex出ないものを取得
 */
export function getNotes(edges) {
  const notes = []
  edges.map(data => {
    const node = new Node(data.node)

    if (node.isNote) {
      notes.push(node)
    }
  })

  return notes
}

/**
 * 最初に見つかったgroupがbooksでnameがindexのものを取得
 */
export function getBook(edges) {
  let book = null
  edges.some(data => {
    const node = new Node(data.node)

    if (node.isBook) {
      book = node
      return true
    }
  })

  return book
}

/**
 * 指定したslugに一致するNodeだけ取得
 */
export function getNodesAtSlug(edges, slugs) 
{
  const nodes = [];

  edges.map(data => 
  {
    const node = new Node(data.node);

    if (0 <= slugs.indexOf(node.slug)){
      nodes.push(node);  
    }  
  })

  return nodes;
}

/**
 * edgesの中からkeyをslugとして本の名前を取得
 */
export function getBookNames(edges) {
  const names = {};

  edges.map((data) => {
    const node = new Node(data.node);

    if (node.isBook) {
      names[node.slug] = node.title;
    }
  })

  return names;
}