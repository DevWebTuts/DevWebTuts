export default (router, options = {}) => store => {
    let moduleName = options.moduleName || 'route'

    store.registerModule(moduleName, {
        namespaced: true,
        state: cloneRoute(router.currentRoute),
        mutations: {
            'ROUTE_CHANGED': function (state, transition) {
                store.state[moduleName] = cloneRoute(transition.to, transition.from)
            }
        }
    })

    let isTimeTraveling = false,
        currentPath;

    // sync router on store change
    store.watch(state => state[moduleName],
        route => {
            if (route.fullPath === currentPath) {
                return
            }
            isTimeTraveling = true
            let methodToUse = !currentPath ? 'replace' : 'push'
            currentPath = route.fullPath
            router[methodToUse](route)
        }, {
            sync: true
        })

    // sync store on router navigation
    router.afterEach((to, from) => {
        if (isTimeTraveling) return isTimeTraveling = false;
        currentPath = to.fullPath
        store.commit(`${moduleName}/ROUTE_CHANGED`, {
            to,
            from
        });
    })
}

function cloneRoute(to, from) {
    let clone = { ...to
    };
    if (from) {
        clone.from = cloneRoute(from)
    }
    return Object.freeze(clone)
}