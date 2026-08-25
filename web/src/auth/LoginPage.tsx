import { useMemo, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function LoginPage() {
  const {
    isAuthLoading,
    isAuthenticated,
    requestLoginCode,
    verifyLoginCode,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [devCode, setDevCode] = useState("");
  const [hasRequestedCode, setHasRequestedCode] = useState(false);
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const redirectTo = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const requested = params.get("redirect");
    return requested?.startsWith("/") ? requested : "/curriculum";
  }, [location.search]);

  if (!isAuthLoading && isAuthenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  async function handleRequestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    setDevCode("");

    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      setError("Enter your EASTIE email.");
      return;
    }

    try {
      setIsRequestingCode(true);
      const result = await requestLoginCode(normalizedEmail);
      setEmail(normalizedEmail);
      setHasRequestedCode(true);
      setStatus(result.message);
      setDevCode(result.devLoginCode ?? "");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not send login code.");
    } finally {
      setIsRequestingCode(false);
    }
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!normalizeEmail(email) || !/^\d{6}$/.test(code.trim())) {
      setError("Enter the 6-digit code from your email.");
      return;
    }

    try {
      setIsVerifyingCode(true);
      await verifyLoginCode({ code, email });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login code verification failed.");
    } finally {
      setIsVerifyingCode(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-hero" aria-label="EASTIE login">
        <div className="login-brand">
          <img className="login-crest" src="/assets/eastie_crest.jpg" alt="EASTIE crest" />
          <div>
            <p>EASTIE Curriculum</p>
            <h1>Teacher Portal</h1>
          </div>
        </div>
        <p className="login-copy">
          Sign in with your EASTIE teacher email. We will send a one-time 6-digit code and keep your session in a secure HttpOnly cookie.
        </p>
        <div className="login-art" aria-hidden="true">
          <img src="/assets/eastie_dolphins.png" alt="" />
        </div>
      </section>

      <section className="login-card">
        <p className="login-kicker">EASTIE App Login</p>
        <h2>Sign in to continue</h2>

        {!hasRequestedCode ? (
          <form className="login-form" onSubmit={handleRequestCode}>
            <label>
              <span>Email</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="teacher@eastie.com.cn"
                type="email"
                value={email}
              />
            </label>
            <button className="login-submit" disabled={isRequestingCode} type="submit">
              {isRequestingCode ? "Sending..." : "Send Login Code"}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleVerifyCode}>
            <label>
              <span>Email</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                value={email}
              />
            </label>
            <label>
              <span>6-digit code</span>
              <input
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={6}
                name="code"
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                type="text"
                value={code}
              />
            </label>
            <button className="login-submit" disabled={isVerifyingCode} type="submit">
              {isVerifyingCode ? "Checking..." : "Sign In"}
            </button>
            <button
              className="forgot-password-link"
              disabled={isRequestingCode}
              onClick={async () => {
                try {
                  setError("");
                  setStatus("");
                  setDevCode("");
                  setIsRequestingCode(true);
                  const result = await requestLoginCode(email);
                  setStatus(result.message);
                  setDevCode(result.devLoginCode ?? "");
                } catch (error) {
                  setError(error instanceof Error ? error.message : "Could not resend login code.");
                } finally {
                  setIsRequestingCode(false);
                }
              }}
              type="button"
            >
              Resend code
            </button>
          </form>
        )}

        {status ? <p className="auth-status">{status}</p> : null}
        {devCode ? (
          <p className="auth-status">
            Local dev code: <strong>{devCode}</strong>
          </p>
        ) : null}
        {error ? <p className="login-error">{error}</p> : null}

        <p className="login-note">Only active teacher/admin emails on the EASTIE allowlist can receive a login code.</p>
      </section>
    </main>
  );
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}
