/** Apresenta o volume como escala somente quando existe uma capacidade conhecida. */
export function MedidorNivel({ volume, capacidade }) {
  const valorDisponivel = volume != null && capacidade > 0
  const percentual = valorDisponivel ? Math.min(100, Math.max(0, (volume / capacidade) * 100)) : 0

  return (
    <section className="medidor-nivel" aria-label="Nível de água">
      <div className="medidor-nivel-rotulos">
        <span>Nível da reserva</span>
        <strong>{valorDisponivel ? `${Math.round(percentual)} por cento` : 'Capacidade indisponível'}</strong>
      </div>
      <div
        className="medidor-nivel-trilho"
        role="progressbar"
        aria-label="Volume da reserva em relação à capacidade cadastrada"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={valorDisponivel ? Math.round(percentual) : undefined}
        aria-valuetext={valorDisponivel ? `${volume} litros de ${capacidade} litros` : 'Indisponível'}
      >
        <span style={{ width: `${percentual}%` }} />
      </div>
    </section>
  )
}
