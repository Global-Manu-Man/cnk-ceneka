exports.getInformationAddress = async (req, res) => {
    const { codigo_postal } = req.params;
    const key = 'd1b726ba03907ec0e841c47d17c413fac4af7966';

    try {
        const response = await fetch(`https://api.tau.com.mx/dipomex/v1/codigo_postal?cp=${codigo_postal}`, {
            method: 'GET',
            headers: {
                'APIKEY': key,
            }
        });

        const data = await response.json();

        if (!data.error) {
            const { estado, municipio, colonias } = data.codigo_postal;
            return res.json({
                estado,
                municipio,
                colonias
            });
        }

        return res.status(404).json({ error: "No se encontró dicho código postal" });

    } catch (err) {
        return res.status(500).json({ error: "Error al consultar el código postal", detalle: err.message });
    }
};
