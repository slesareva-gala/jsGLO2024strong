// Вывод результатов вычеслений выражений, записанных через запятую в строке ввода, 
// результат которых соответствует выбранному для фильтрации типу.

// Список объявлений констант
// - функция фильтрации массива по типу значений, 
//    принимает название типа, массив значений (spread массива)
//   возвращает отфильтрованный массив
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	// - функция скрытия всех элементов-сообщений с экрана
	hideAllResponseBlocks = () => {
		// - константа, содержащая массив ссылок на элементы (получен из node list элементов 
		// по запросу querySelectorAll с селектором div класса .dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// - согласно списку скрываем элементы (все: и хорошие сообщения и плохие)
		//   устанавливаем стиль display = 'none'
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// функция "включатель/выключатель" сообщений
	// параметры: cssSelectorБлокаСообщения, строкаСообщения, [idНазвание]
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// скрыть все сообщения 
		hideAllResponseBlocks();
		// найти по селектору blockSelector элемент и установить ему стиль display = 'block'
		// (сделать видимым)
		document.querySelector(blockSelector).style.display = 'block';
		// если таки id span получили, 
		if (spanSelector) {
			// то записать в его контекст сообщение msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// функции, вызывающие showResponseBlock и передающеие cssSelectorБлокаСообщения, строкаСообщения, [idНазвание]
	// - функция показать ошибку
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// - функция показать результа, когда он есть
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// - функция показать результа, когда его таки и нет (пустая строка)
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// - функция фильтрации по типу
	// параметры: названия типа и строка с выражениями (через запятую)
	tryFilterByType = (type, values) => {
		// конструкция try...catch пытается выполнить инструкции в блоке try, 
		try {
			// 1) в объявленную констату valuesArray записываем строку с перечислением
			// через запятую (join) результатов вычислений отфильтрованными filterByType 
			// (возвращает массив)			
			// 2) eval макроподстановкой формирует и запускает filterByType с параметрами:
			// 2.1 - строка, содержащая название типа фильтрации
			// 2.2 - .... параметры-выражения (в строке разделенные запятыми)
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// константа строка для сообщения о результатах, если в valuesArray есть данные
			const alertMsg = (valuesArray.length) ?
				// то это сообщение (включает название типа и перечень результатов, соотв.типа)
				`Данные с типом ${type}: ${valuesArray}` :
				// иначе это сообщение (включает название типа)
				`Отсутствуют данные типа ${type}`;
			// запускам showResults с параметром сформированная строка - сообщения 
			showResults(alertMsg);

			// .... и, в случае ошибки, выполняет блок catch
		} catch (e) {
			// запускам showError со параметром сообщение-exception
			showError(`Ошибка: ${e}`);
		}
	};


// объявление константы filterButton с ссылкой  на объект с id="filter-btn",
// соответствует кнопке "Фильтровать"
const filterButton = document.querySelector('#filter-btn');

// подключение слушателей по клику левой кнопкой мыши на элемент filterButton
filterButton.addEventListener('click', e => {
	// объявление константы typeInput с ссылкой на объект с id="type",
	// соответствует select-у выбора фильтра типов результатов
	const typeInput = document.querySelector('#type');
	// объявление константы dataInput с ссылкой на объект с id="data",
	// соответствует input-у поля для ввода выражений
	const dataInput = document.querySelector('#data');

	// если поле для записи выражений пустое
	if (dataInput.value === '') {
		// на элементе по ссылке dataInput, методом HTMLSelectElement.setCustomValidity()
		// устанавливаем специальное сообщение-предупреждение об ошибке (всплывает)
		// с заданным текстом
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// запускаем на выполнение функцию showNoResults
		showNoResults();

		// иначе (что-то в поле для записи выражений записали)
	} else {
		// снимаем с элемента по ссылке dataInput, методом HTMLSelectElement.setCustomValidity()
		// специальное сообщение-предупреждение об ошибке		
		dataInput.setCustomValidity('');
		// отменяем действие по умолчанию по клику мышкой на <button>
		e.preventDefault();
		// запускаем функцию tryFilterByType с параметрами:
		// 1) значение фильтра отбора без пробелов в начале и конце строки
		// 2) значение введенной для обработки строки  без пробелов в начале и конце
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

