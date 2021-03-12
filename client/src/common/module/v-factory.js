const Factory = function (React, ReactDom, redux, reactRedux) {
  var obj = {
    createProvider: function (pageComponent, action) {
      var Provider = reactRedux.Provider
      var connect = reactRedux.connect

      var mapStateToProps = function (state) {
        return state
      }

      var mapDispatchToProps = function (dispatch) {
        return redux.bindActionCreators(action, dispatch)
      }

      var SmartPageComponent = connect(mapStateToProps, mapDispatchToProps)(pageComponent)
      var provider = {
        render: function (delegate, elts, store, opts) {
          return ReactDom.render(React.createElement(
            Provider,
            { store: store },
            React.createElement(SmartPageComponent, { delegate: delegate }))
          , elts)
        }
      }
      return provider
    },
    createStore: function (reducers) {
      var createStore = redux.createStore
      var combineReducers = redux.combineReducers
      var store = createStore(combineReducers(reducers))
      return store
    },
    createAction: function (action, dispatch) {
      return redux.bindActionCreators(action, dispatch)
    }
  }

  return obj
}

module.exports = {
  Factory
}
