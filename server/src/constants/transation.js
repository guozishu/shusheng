module.exports = {
  queryArticleList: {
    'glgnar0i59g': 'articleInfo LEFT JOIN articleCategory ON articleInfo.cate_Id=articleCategory.cust_id',
    'iclwhd7t1bp': 'articleInfo.id,title,articleCategory.`name`',
    'psopt2djb1b': `isOnline=1 ORDER BY articleInfo.id LIMIT `,
    'd3x3bpbpog8': 'articleInfo',
    '7kawqvnb61v': 'COUNT(id) as totalPage'
  }
}