export const modalMixin = {
    methods: {
        close: function () {
            window.location.hash = "";
        }
    }
};
