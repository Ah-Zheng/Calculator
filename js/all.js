const formulaText = $('.formula');
const cacheText = $('.cache');
let formula = '';
let cache = '0';
let reSign = /^[+\-\*\/]$/;
updateView();

// 數字及小數點按紐
$(document).on('click', '.btn', function (e) {
    e.preventDefault();
    let num = $(this).val();
    let formulaLast = formula.substr(-1);
    if (reSign.test(formulaLast)) {
        cache = '0';
    }
    if (cache == '0') {
        if (num == '.') {
            cache += num;
            formula += cache;
        } else {
            cache = '';
            cache += num;
            formula += num;
        }
    } else {
        if (num == '.' && cache.indexOf('.') == -1) {
            cache += num;
            formula += num;
        } else if (num != '.') {
            cache += num;
            formula += num;
        }
    }
    console.log(cache);
    cacheText.val(cache);
});

// 運算符號按紐
$(document).on('click', '.sign', function (e) {
    e.preventDefault();
    let sign = $(this).val();
    if (cache != 0) {
        let formulaLast = formula.substr(-1);
        if (reSign.test(formulaLast)) {
            formula = formula.replace(formulaLast, sign);
        } else {
            formula += sign;
        }
    } else {
        cache += sign;
        formula += cache;
    }
    formulaText.val(formula);
});

// 倒退按紐
$('.btn_del').click(function (e) {
    e.preventDefault();

    // 判斷暫存的值是否長度為1或值為0
    if (cache.length == 1) {
        cache = '0';
        formula = formula.substr(0, formula.length - 1);
    } else {
        // 如果不是的話就將值的最後一位字元刪除
        cache = cache.substr(0, cache.length - 1);
        formula = formula.substr(0, formula.length - 1);
        console.log('formula' + formula);
        console.log('cache' + cache);
    }
    cacheText.val(cache);
});

// 清空按紐
$('.btn_ac').click(function (e) {
    e.preventDefault();
    formula = '';
    cache = '0';
    updateView();
});

// 等於按紐
$('.result').click(function (e) {
    e.preventDefault();
    let formulaLast = formula.substr(-1);
    if (reSign.test(formulaLast)) {
        formula = formula.substr(0, formula.length - 1);
    }
    let res = `${eval(formula)}`;
    if (!isNaN(res)) {
        cache = res;
        formula += `=${res}`;
        updateView();
    }
    formula = '';
    cache = '0';
});

// 畫面更新
function updateView() {
    formulaText.val(formula);
    cacheText.val(cache);
}