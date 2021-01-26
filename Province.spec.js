describe('province', function() {
    let aisa;

    beforEach(function() {
        asia = new Province(sampleProvinceData());
    });

    it('shortfall', function() {
        assert.equal(asia.shortfall, 5);
    });

    it('profit', function() {
        expect(asia.profit).equal
    });
});
