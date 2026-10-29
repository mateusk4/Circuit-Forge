-- Execute no pgAdmin: clique com o botão direito no banco "bancada" > Query Tool > cole e execute (F5).

CREATE TABLE IF NOT EXISTS produtos (
  id              SERIAL PRIMARY KEY,
  nome            VARCHAR(150)  NOT NULL UNIQUE,
  categoria       VARCHAR(60)   NOT NULL,
  tipo            VARCHAR(20)   NOT NULL,           -- chave do ícone usado no front
  preco           NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
  estoque         INTEGER       NOT NULL DEFAULT 0 CHECK (estoque >= 0),
  especificacoes  JSONB         NOT NULL DEFAULT '{}',
  criado_em       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

INSERT INTO produtos (nome, categoria, tipo, preco, estoque, especificacoes) VALUES
('Kit resistores 1/4W (600 pçs)','Passivos','res',34.90,42,'{"Tolerância":"1%","Valores":"30 tipos"}'),
('Capacitor eletrolítico 470µF','Passivos','cap',1.80,380,'{"Tensão":"25V","Tipo":"Radial"}'),
('Capacitor cerâmico 100nF','Passivos','cer',0.35,2400,'{"Tensão":"50V","Pacote":"Disco"}'),
('LED difuso 5mm vermelho','Semicondutores','led',0.40,1500,'{"Corrente":"20mA","Tensão":"2,0V"}'),
('Transistor BC548 NPN','Semicondutores','to92',0.70,900,'{"Corrente":"100mA","Pacote":"TO-92"}'),
('Regulador de tensão LM7805','Semicondutores','reg',2.90,210,'{"Saída":"5V","Corrente":"1A"}'),
('Microcontrolador ATmega328P','Circuitos integrados','ic',24.50,64,'{"Flash":"32KB","Pacote":"DIP-28"}'),
('Timer NE555','Circuitos integrados','ic',2.20,7,'{"Pacote":"DIP-8","Tensão":"4,5–16V"}'),
('Módulo ESP32 DevKit V1','Módulos','mod',49.90,35,'{"Conexão":"Wi-Fi + BT","GPIOs":"30"}'),
('Sensor de temperatura DHT22','Módulos','sen',28.00,58,'{"Faixa":"-40 a 80°C","Interface":"1-wire"}'),
('Protoboard 830 pontos','Ferramentas','pb',19.90,120,'{"Pontos":"830","Cor":"Branca"}'),
('Multímetro digital','Ferramentas','mm',89.90,0,'{"Display":"3½ dígitos","CAT":"II 600V"}')
ON CONFLICT (nome) DO NOTHING;
