/* ================================
   BOTÃO VOLTAR AO TOPO
================================ */

const botaoTopo = document.getElementById("voltarTopo");

if (botaoTopo) {
    botaoTopo.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ================================
   GRÁFICO DA CURVA DE FÓSFORO
================================ */

const canvasFosforo = document.getElementById("graficoFosforo");

if (canvasFosforo) {

    const ctx = canvasFosforo.getContext("2d");

    const largura = 700;
    const altura = 400;

    canvasFosforo.width = largura;
    canvasFosforo.height = altura;

    /* Fundo */

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, largura, altura);

    /* Área do gráfico */

    const margem = {
        esquerda: 70,
        direita: 30,
        superior: 30,
        inferior: 60
    };

    const larguraGrafico =
        largura - margem.esquerda - margem.direita;

    const alturaGrafico =
        altura - margem.superior - margem.inferior;


    /* Escala */

    const xMin = 0;
    const xMax = 10;

    const yMin = -10;
    const yMax = 220;


    /* Conversão dos valores para pixels */

    function converterX(x) {
        return margem.esquerda +
            ((x - xMin) / (xMax - xMin)) *
            larguraGrafico;
    }

    function converterY(y) {
        return margem.superior +
            alturaGrafico -
            ((y - yMin) / (yMax - yMin)) *
            alturaGrafico;
    }


    /* ================================
       LINHAS DE GRADE
    ================================ */

    ctx.strokeStyle = "#e5eee8";
    ctx.lineWidth = 1;

    for (let y = 0; y <= 200; y += 20) {

        ctx.beginPath();

        ctx.moveTo(
            margem.esquerda,
            converterY(y)
        );

        ctx.lineTo(
            margem.esquerda + larguraGrafico,
            converterY(y)
        );

        ctx.stroke();
    }


    /* ================================
       EIXOS
    ================================ */

    ctx.strokeStyle = "#315c45";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(
        margem.esquerda,
        margem.superior
    );

    ctx.lineTo(
        margem.esquerda,
        margem.superior + alturaGrafico
    );

    ctx.lineTo(
        margem.esquerda + larguraGrafico,
        margem.superior + alturaGrafico
    );

    ctx.stroke();


    /* ================================
       CURVA DO FÓSFORO
       y = 21,535x - 0,8599
    ================================ */

    ctx.strokeStyle = "#315c45";
    ctx.lineWidth = 4;

    ctx.beginPath();

    let primeiroPonto = true;

    for (let x = xMin; x <= xMax; x += 0.1) {

        const y =
            21.535 * x - 0.8599;

        const px = converterX(x);
        const py = converterY(y);

        if (primeiroPonto) {

            ctx.moveTo(px, py);

            primeiroPonto = false;

        } else {

            ctx.lineTo(px, py);

        }
    }

    ctx.stroke();


    /* ================================
       MARCAÇÕES DO EIXO X
    ================================ */

    ctx.fillStyle = "#555";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    for (let x = 0; x <= 10; x += 2) {

        ctx.fillText(
            x,
            converterX(x),
            margem.superior +
            alturaGrafico +
            25
        );
    }


    /* ================================
       MARCAÇÕES DO EIXO Y
    ================================ */

    ctx.textAlign = "right";

    for (let y = 0; y <= 200; y += 20) {

        ctx.fillText(
            y,
            margem.esquerda - 10,
            converterY(y) + 4
        );
    }


    /* ================================
       NOME DO EIXO X
    ================================ */

    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#315c45";

    ctx.fillText(
        "Concentração de fósforo",
        largura / 2,
        altura - 15
    );


    /* ================================
       NOME DO EIXO Y
    ================================ */

    ctx.save();

    ctx.translate(18, altura / 2);

    ctx.rotate(-Math.PI / 2);

    ctx.textAlign = "center";

    ctx.fillText(
        "Absorbância",
        0,
        0
    );

    ctx.restore();


    /* ================================
       EQUAÇÃO DA CURVA
    ================================ */

    ctx.font = "bold 15px Arial";
    ctx.fillStyle = "#315c45";
    ctx.textAlign = "left";

    ctx.fillText(
        "y = 21,535x − 0,8599",
        margem.esquerda + 20,
        margem.superior + 25
    );

    ctx.font = "14px Arial";

    ctx.fillText(
        "R² = 0,9928",
        margem.esquerda + 20,
        margem.superior + 47
    );

}