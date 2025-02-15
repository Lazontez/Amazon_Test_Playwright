export function searchpage (){
    return ({
        searchField: ()=>{
            // Will be retrieved by placeholder
            return "Search Amazon"
        }, 
        searchBtn: ()=>{
            return '[id="nav-search-submit-button"]'
        }
    })
}