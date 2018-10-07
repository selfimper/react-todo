import AV from 'leancloud-storage'
var APP_ID = 'rhvkjdBnzmW83KQ8WrocTx1R-gzGzoHsz';
var APP_KEY = '5FiK6qxiGE98uNQifD0MygKm';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
 export default AV

 export const TodoModel = {
    getByUser(user, successFn, errorFn){
        // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
        let query = new AV.Query('Todo')
        query.find().then((response) => {
          let array = response.map((t) => {
            return {id: t.id, ...t.attributes}
          })
          successFn.call(null, array)
        }, (error) => {
          errorFn && errorFn.call(null, error)
        })
      },
    create({status, title, deleted}, successFn, errorFn){
      let Todo = AV.Object.extend('Todo')
      let todo = new Todo()
      todo.set('title', title)
      todo.set('status', status)
      todo.set('deleted', deleted)
      todo.save().then(function (response) {
        successFn.call(null, response.id)
      }, function (error) {
        errorFn && errorFn.call(null, error)
      });
     },
    update(){
     },
    destroy(){
     }
  }
  export function signUp (email, username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
   var user = new AV.User()
   // 设置用户名
   user.setUsername(username)
   // 设置密码
   user.setPassword(password)
   // 设置邮箱
   user.setEmail(email)

   user.signUp().then(function (loginedUser) {
     let user = getUserFromAVUser(loginedUser)
     successFn.call(null, user)
   }, function (error) {
     errorFn.call(null, error)
   })
    return undefined
  }

  export function signIn(username, password, successFn, errorFn){
    AV.User.logIn(username, password).then(function (loginedUser) {
      let user = getUserFromAVUser(loginedUser)
      successFn.call(null, user)
    }, function (error) {
      errorFn.call(null, error)
    })
  }

  export function getCurrentUser () {
    let user = AV.User.current()
    if(user){
      return getUserFromAVUser(user)
    }else{
      return null
    }
  }

  export function signOut () {
    AV.User.logOut()
    return undefined
  }

  export function sendPasswordResetEmail(email, successFn, errorFn){
    AV.User.requestPasswordReset(email).then(function (success) {
      successFn.call()
    }, function (error) {
      errorFn.call(null, error)
    })
  }

  function getUserFromAVUser(AVUser){
   return {
     id: AVUser.id,
     ...AVUser.attributes
    }
}