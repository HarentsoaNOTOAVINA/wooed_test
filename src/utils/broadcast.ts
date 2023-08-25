export default function broadcast(name: any, value: any) {
    return function vm(app: any) {
        let vm = app._context.parent;
        while (vm) {
            vm.$emit(name, value);
            vm = vm.parent;
        }
    };
}