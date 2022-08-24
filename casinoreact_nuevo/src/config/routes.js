export const menu_routes_sidebar = [
    {
        url: '/',
        component: "Home",
        text: "Home",
        category: "Menu",
        private: false,
        id: "home",
        icon : "assets/icons/home.png"
    },
    {
        url: '/wallet',
        component: "Wallet",
        text: "My Wallet",
        category: "Menu",
        private: false,
        id: "wallet",
        icon : "assets/icons/wallet.png"
    },
    {
        url: '/award',
        component: "Award",
        text: "Points",
        category: "Menu",
        private: false,
        id: "award",
        icon : "assets/icons/award.png"
    }
]

export const games_routes_sidebar = [
    {
        url: '/recent',
        component: "Recent",
        text: "Recently Played",
        category: "Games",
        private: false,
        id: "recent",
        icon : "assets/icons/recent.png"
    },
    {
        url: '/rating',
        component: "Rating",
        text: "Top Rated",
        category: "Games",
        private: false,
        id: "rating",
        icon : "assets/icons/rating.png"
    },
    {
        url: '/heart',
        component: "Favorite",
        text: "Favorites",
        category: "Games",
        private: false,
        id: "heart",
        icon : "assets/icons/heart.png"
    }
]

export const general_routes_sidebar = [
    {
        url: '/settings',
        component: "Settings",
        text: "Settings",
        category: "General",
        private: false,
        id: "settings",
        icon : "assets/icons/settings.png"
    }
]

const sidebar_routes = {
    menu_routes_sidebar,
    games_routes_sidebar,
    general_routes_sidebar
}

const game_routes = [
    {
        url: '/blackjack',
        component: "Blackjack",
        text: "Blackjack",
        private: false,
        id: "blackjack"
    },
    {
        url: '/poker',
        component: "Poker",
        text: "Texas Hold'em",
        private: false,
        id: "poker"
    },
    {
        url: '/rooms',
        component: "PokerRooms",
        text: "Poker Online",
        private: false,
        id: "rooms"
    },
    {
        url: '/pokerOnline',
        component: "PokerOnline",
        text: "Poker Online",
        private: false,
        id: "pokerOnline"
    },
    {
        url: '/roulette',
        component: "Roulette",
        text: "Roulette",
        private: false,
        id: "roulette"
    }
]

const settings_routes = [
    {
        url: '/editprofile',
        component: "EditProfile",
        text: "Edit Profile",
        private: false,
        id: "editprofile"
    },
    {
        url: '/language',
        component: "Language",
        text: "Language",
        private: false,
        id: "language"
    },
    {
        url: '/password&security',
        component: "PasswordAndSecurity",
        text: "Password & Security",
        private: false,
        id: "password&security"
    },
    {
        url: '/termsofservice',
        component: "TermsOfService",
        text: "Terms of Service",
        private: false,
        id: "termsofservice"
    }
]

const transaction_routes = [
    {
        url: '/orders',
        component: "Orders",
        text: "Orders",
        private: false,
        id: "orders"
    },
    {
        url: '/transaction',
        component: "Transaction",
        text: "Transaction",
        private: false,
        id: "transaction"
    }
]

const modal_routes = [
    {
        url: '/login',
        text: "Login",
        private: false,
        id: "login"
    },
    {
        url: '/signup',
        text: "Signup",
        private: false,
        id: "signup"
    }
]

const general_routes = [
    {
        url: '/*',
        component: "Error",
        private: false,
        id: "error"
    }
]

const old_routes = [
    {
        url: '/profile',
        id: "profile"
    },
    {
        url: '/admin',
        id: "admin"
    },
    {
        url: '/feedback',
        id: "feedback"
    }
]

const routes = [
    ...menu_routes_sidebar,
    ...games_routes_sidebar,
    ...general_routes_sidebar,
    ...game_routes,
    ...settings_routes,
    ...transaction_routes,
    ...general_routes
]

export {
    sidebar_routes,
    game_routes,
    settings_routes,
    transaction_routes,
    general_routes,
    modal_routes,
    old_routes
}

export default routes