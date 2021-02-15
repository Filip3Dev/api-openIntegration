# Teste de integração LinkApi

- Um cron roda diariamente as 23:59 e carrega os negócios com status 'won' do pipedrive.
- Salva os negocios no mongo e registra no bling.
- O endpoint `/integration` lista os negócios agregados por dia e com o valor total por dia.
