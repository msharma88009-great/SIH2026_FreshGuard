def calculate_freshness_score(temperature,humidity,gas_level):
    score=100.0
    t,h,g=float(temperature),float(humidity),float(gas_level)
    if t>8: score-=min((t-8)*5,35)
    if h>75: score-=min((h-75)*0.5,20)
    if g>100: score-=min((g-100)*0.2,30)
    return round(max(0,min(100,score)),2)
