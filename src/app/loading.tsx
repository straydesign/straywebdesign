export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-warm-white">
      <div className="flex flex-col items-center gap-8">
        {/* Animated logo pulse */}
        <svg
          viewBox="0 0 144 72"
          width={72}
          height={36}
          className="animate-pulse"
          aria-hidden="true"
        >
          <path
            d="M39.33,12.75c13.44.07,17.56-.07,17.66.67.11.83-4.89,2.3-6.92,2.83-3.84.99-12.62,4.3-12.43,5.65.38,2.66,15.63,2.58,19.49,2.54,38-.34,82.24-4.93,82.36-4.15.05.31-10.58,3.21-25.85,5.28-14,1.9-25.43,2.23-26.7,7-.41,1.53.05,3.65,1.22,7.95.7,2.58,2.02,6.35,3.56,11.54.1.33.46,1.57.55,3.23.1,1.86-.11,4.71-.91,4.87-.78.16-1.88-2.33-2.74-4.27-4.16-9.27-6.29-13.86-7.78-15.38-3.2-3.26-7.81-3.4-17.05-3.67-.62-.02-5.85-.1-12.31,1.61-5.28,1.39-6.39,2.66-6.86,3.65-1,2.09-.26,4.91.53,7.94.48,1.82,1.03,3.64,1.35,5.5.08.45.39,1.25.34,2.34,0,.12-.15,2.7-.99,2.9-1.09.26-3.46-4.67-8.14-14.54-.17-.35-1.96-4.14-4.87-8.62-1.32-2.02-3.24-4.72-6.38-5.66-2.57-.77-3.54.08-8.17.53-2.64.26-8.48.82-11.44-2.54-2.21-2.5-1.79-6-1.7-6.64.57-4.02,3.76-6.36,5-7.26,1.62-1.18,4.72-2.96,18.74-3.33,2.6-.07,2.7-.01,10.46.03h-.02,0Z"
            fill="none"
            stroke="#3B82F6"
            strokeMiterlimit={10}
            strokeWidth={3.6}
          />
        </svg>

        {/* Shimmer loading bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-electric via-accent to-electric"
            style={{
              animation: 'loading-slide 1.2s ease-in-out infinite',
            }}
          />
        </div>

        <style>{`
          @keyframes loading-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
