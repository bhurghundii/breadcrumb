export function getUserName(result : any) {
    return result ? result.username : ""
  }

  export function getAccountId(result : any) {
    return result ? result.attributes.sub : ""
  }