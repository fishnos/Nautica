export default function PNGConsants() {
    function Icons() {
        function Unfocused() {
            const closedLibraryTabIcon = '@/assets/icons/closed-library.png';

            return ({ closedLibraryTabIcon, });
        }

        function Focused() {
            const openLibraryTabIcon = '@/assets/icons/open-library.png';
            const profileTabIcon = '@/assets/icons/profile.png';
            const importTabIcon = '@/assets/icons/import.png';
            const homeTabIcon = '@/assets/icons/home.png';
            const bookStoreTabIcon = '@/assets/icons/book-store.png';
            const libraryTabIcon = '@/assets/icons/library.png';

            return ({ 
                openLibraryTabIcon, 
                profileTabIcon,
                importTabIcon,
                homeTabIcon,
                bookStoreTabIcon,
                libraryTabIcon,
            });
        }

        return ({ Unfocused, Focused });
    }

    function Images() {
        const adaptiveIcon = '@/assets/images/adaptive-icon.png';
        const favicon = '@/assets/images/favicon.png';
        const appIcon = '@/assets/images/icon.png';
        const splashIcon = '@/assets/images/splash-icon.png';

        return ({
            adaptiveIcon,
            favicon,
            appIcon,
            splashIcon,
        });
    }

    return ({ Icons, Images });
}