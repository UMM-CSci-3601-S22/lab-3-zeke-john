import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  const testTodos: Todo[] = [
    {
      _id: '58895985a22c04e761776d54',
      owner: 'Blanche',
      status: false,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      _id: '58895985c1849992336c219b',
      owner: 'Fry',
      status: false,
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      _id: '58895985ae3b752b124e7663',
      owner: 'Fry',
      status: true,
      body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
      category: 'homework'
    },
    {
      _id: '58895985186754887e0381f5',
      owner: 'Blanche',
      status: true,
      body: 'Incididunt enim ea sit qui esse magna eu. Nisi sunt exercitation est Lorem consectetur incididunt'
      + 'cupidatat laboris commodo veniam do ut sint.',
      category: 'software design'
    }
  ];

  let todoService: TodoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  describe('getTodos()', () => {

    it('should get todos from server', () => {
      todoService.getTodos().subscribe(todos => expect(todos).toBe(testTodos));

      const req = httpTestingController.expectOne(todoService.todoUrl);
      expect(req.request.method).toEqual('GET');
      expect(req.request.params.keys().length).toBe(0);
      req.flush(testTodos);
    });
  });

  describe('Calling getTodos() with parameters correctly forms the HTTP request', () => {

    //Tests filtering by 'owner'
    it('correctly calls api/todos with filter parameter \'owner\'', () => {
      todoService.getTodos({owner: 'Blanche'}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('owner')).toEqual('Blanche');
      req.flush(testTodos);
    });

    it('correctly calls api/todos with filter parameter \'owner\'', () => {
      todoService.getTodos({owner: 'Blanche'}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('owner')).toEqual('Blanche');
      req.flush(testTodos);
    });

    // Tests filtering by 'category'
    it('correctly calls api/todos with filter parameter \'category\'', () => {
      todoService.getTodos({category: 'software design'}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('category')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('category')).toEqual('software design');
      req.flush(testTodos);
    });

    // Tests filtering by 'status'
    it('correctly calls api/todos with filter parameter \'status\'', () => {
      todoService.getTodos({ status: true }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('status')).toBeTruthy();
      req.flush(testTodos);
    });

    // tests filtering by 'contents'
    it('correctly calls api/todos with filter parameter \'body\'', () => {
      todoService.getTodos({ body: 'magna' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('body')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('body')).toEqual('magna');
      req.flush(testTodos);
    });

    // Tests multiple filters
    it('correctly calls api/todos with multiple filter parameters', () => {
      todoService.getTodos({owner: 'Blanche', category: 'software design'}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
        && request.params.has('category')
      );

      expect(req.request.method).toEqual('GET');

      expect(req.request.params.get('owner')).toEqual('Blanche');
      expect(req.request.params.get('category')).toEqual('software design');
      req.flush(testTodos);
    });
  });

  describe('getTodoByID()', () => {
    it('calls api/todos/id with the correct ID', () => {

      const targetTodo: Todo = testTodos[1];
      const targetId: string = targetTodo._id;

      todoService.getTodoById(targetId).subscribe(

        todo => expect(todo).toBe(targetTodo)
      );

      const expectedUrl: string = todoService.todoUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(targetTodo);
    });
  });

  describe('filterTodos()', () => {

    it('filters by owner', () => {
      const todoOwner = 'Fry';
      const filteredTodos = todoService.filterTodos(testTodos, { owner: todoOwner });

      expect(filteredTodos.length).toBe(2);

      filteredTodos.forEach(todo => {
        expect(todo.owner.indexOf(todoOwner)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by category', () => {
      const todoCategory = 'video games';
      const filteredTodos = todoService.filterTodos(testTodos, { category: todoCategory });

      expect(filteredTodos.length).toBe(1);

      filteredTodos.forEach(todo => {
        expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by owner and category', () => {

      const todoOwner = 'Blanche';
      const todoCategory = 'software design';
      const filters = { owner: todoOwner, company: todoCategory };
      const filteredTodos = todoService.filterTodos(testTodos, filters);

      expect(filteredTodos.length).toBe(2);

      filteredTodos.forEach(todo => {
        expect(todo.owner.indexOf(todoOwner)).toBeGreaterThanOrEqual(0);
        expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
