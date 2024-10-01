declare global {
  interface Window {
    grecaptcha: any;
  }
}
export default function ReCaptchaV3() {
  const imported = document.createElement("script");
  imported.src = "https://www.google.com/recaptcha/api.js";
  document.head.appendChild(imported);

  return (
    <>
      <div
        className="g-recaptcha"
        data-sitekey={`${import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}`}
        style={{
          transform: "scale(0.85)",
          WebkitTransform: "scale(0.85)",
          transformOrigin: "0 0",
          WebkitTransformOrigin: "0 0",
        }}
      ></div>
    </>
  );
}