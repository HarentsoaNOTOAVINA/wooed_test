<script lang="ts" setup>
    defineProps({
        fill: {
            type: String,
            required: false,
            default: '#D2C8C8',
        },
    });
</script>
<template>
    <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#clip0_111_3163)">
            <path
                d="M10 1.74707C8.26957 1.74852 6.61 2.43467 5.38379 3.65568C4.15758 4.87668 3.46437 6.53331 3.45557 8.26374C3.45557 10.8582 4.91112 13.0304 5.97779 14.6137L6.17223 14.9026C7.2335 16.4408 8.37199 17.9241 9.58334 19.3471L10.0056 19.8415L10.4278 19.3471C11.639 17.924 12.7775 16.4406 13.8389 14.9026L14.0333 14.6082C15.0945 13.0248 16.55 10.8582 16.55 8.26374C16.5412 6.53235 15.8472 4.87488 14.6198 3.65372C13.3924 2.43256 11.7314 1.74705 10 1.74707ZM10 11.1915C9.27921 11.1915 8.57459 10.9778 7.97527 10.5773C7.37594 10.1769 6.90882 9.60768 6.63298 8.94174C6.35714 8.2758 6.28497 7.54303 6.42559 6.83608C6.56622 6.12912 6.91331 5.47974 7.423 4.97006C7.93268 4.46037 8.58206 4.11328 9.28901 3.97265C9.99597 3.83203 10.7287 3.9042 11.3947 4.18004C12.0606 4.45588 12.6298 4.923 13.0303 5.52233C13.4307 6.12165 13.6445 6.82627 13.6445 7.54707C13.6445 8.51364 13.2605 9.44062 12.577 10.1241C11.8936 10.8075 10.9666 11.1915 10 11.1915Z"
                :fill="fill"
            />
            <path
                d="M9.99996 9.61905C11.1444 9.61905 12.0722 8.69129 12.0722 7.54683C12.0722 6.40237 11.1444 5.47461 9.99996 5.47461C8.8555 5.47461 7.92773 6.40237 7.92773 7.54683C7.92773 8.69129 8.8555 9.61905 9.99996 9.61905Z"
                :fill="fill"
            />
        </g>
        <defs>
            <clipPath id="clip0_111_3163">
                <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 0.635742)"
                />
            </clipPath>
        </defs>
    </svg>
</template>
