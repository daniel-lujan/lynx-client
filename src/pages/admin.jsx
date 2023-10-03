import { useState } from "react";
import AnimatedPage from "../components/animated-page";
import { useMutation } from "react-query";
import { resetCalc, triggerCalc } from "../api/fetchers";

export default function AdminPage() {
  const [token, setToken] = useState("");

  const calcMutation = useMutation({
    mutationFn: triggerCalc,
    onSuccess: () => window.alert("Calculos hechos"),
    onError: (e) => window.alert(e.message),
  });

  const resetMutation = useMutation({
    mutationFn: resetCalc,
    onSuccess: () => window.alert("Respuestas eliminadas"),
    onError: (e) => window.alert(e.message),
  });

  return (
    <AnimatedPage>
      <input
        placeholder="Token"
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={() => calcMutation.mutate({ token })} disabled={!token}>
        Calcular
      </button>
      <button onClick={() => resetMutation.mutate({ token })} disabled={!token}>
        Reiniciar
      </button>
    </AnimatedPage>
  );
}
