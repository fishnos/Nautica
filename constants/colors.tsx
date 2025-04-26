export default function Colors() {
    function ThemeColors() {
        function Dark() {
            function BackgroundColor() {
                return '#1c1f20';
            }

            function BorderColors() {
                const concreteGray = '#474d50';

                return { concreteGray };
            }

            function TextColors() {
                const primaryColor = '#e4eaec';
                const secondaryColor = '#474d50';

                return { primaryColor, secondaryColor };
            }

            function WidgetBackgroundColor() {
                return '#43adda';
            }

            return { BackgroundColor, BorderColors, TextColors, WidgetBackgroundColor };
        }

        function Light() {
            function BackgroundColor() {
                return '#f4fbfe';
            }

            function BorderColors() {
                const blueConcrete = '#4e6772';

                return { blueConcrete };
            }

            function TextColors() {
                const primaryColor = '#1b2225';
                const secondaryColor = '#4e6772';

                return { primaryColor, secondaryColor };
            }

            function WidgetBackgroundColor() {
                return '#e4eaec';
            }

            return { BackgroundColor, BorderColors, TextColors, WidgetBackgroundColor };
        }

        return { Dark, Light };
    }

    return { ThemeColors };
}