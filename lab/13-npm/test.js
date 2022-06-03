import {expect} from 'chai';
import {add} from './index.js';

describe('Namespace 1', () => {
    describe('Namespace 2', () => {
        it('will fail', () => {
            expect(false).to.be.true;
        });
    });
});

describe('add', () => {
    it('should add numbers', () => {
        expect(add(1,2)).to.be.eq(3);
    });

    it('should add strings', () => {
        expect(add('1','2')).to.be.eq('12');
    });

    it('should throw when passing objects', () => {
        expect(() => add({}, {})).to.throw(Error, 'At least one parameter is object', 'Fails to detect and object');
    });
})