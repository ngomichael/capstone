import React from 'react'

const UserContext = React.createContext({})

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

// import React from 'react'

// const UserStateContext = React.createContext()
// const UserDispatchContext = React.createContext()

// // export const UserProvider = UserStateContext.Provider
// // export const UserConsumer = UserStateContext.Consumer

// function userReducer(state, action) {
//   switch (action.type) {
//     case 'UPDATE_USER': {
//       return { ...state, userInfo: action.user }
//     }
//   }
// }

// function UserProvider({ children }) {
//   const [state, setUser] = React.useReducer(userReducer, { userInfo: {} })
//   return (
//     <UserStateContext.Provider value={state}>
//       <UserDispatchContext.Provider value={state}>
//         {children}
//       </UserDispatchContext.Provider>
//     </UserStateContext.Provider>
//   )
// }

// function useUserState() {
//   const context = React.useContext(UserStateContext)
//   if (context === undefined) {
//     throw new Error('useUserState must be used within a UserProvider')
//   }
//   return context
// }

// function useUserDispatch() {
//   const context = React.useContext(UserDispatchContext)
//   if (context === undefined) {
//     throw new Error('useCountDispatch must be used within a UserProvider')
//   }
//   return context
// }

// export { UserProvider, useUserState, useUserDispatch }
