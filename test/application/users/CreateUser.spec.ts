import { Test } from '@nestjs/testing';
import { CreateUser } from '@src/application';
import { EmailValidator, IUsersRepositoryWriter } from '@src/domain';

const create = jest.fn();
const usersRepositoryWriterStub = () => ({
  create,
});

describe('application/travels/CreateUsers', () => {
  let usersRepositoryWriter: IUsersRepositoryWriter;
  let emailValidator: EmailValidator;
  let createUser: CreateUser;
  beforeEach(async () => {
    const providers = [
      EmailValidator,
      {
        provide: 'UsersRepositoryWriter',
        useValue: usersRepositoryWriterStub(),
      },
    ];
    const moduleRef = await Test.createTestingModule({
      providers,
    }).compile();
    emailValidator = moduleRef.get<EmailValidator>(EmailValidator);
    createUser = moduleRef.get<CreateUser>(CreateUser);
    usersRepositoryWriter = usersRepositoryWriterStub();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('invoke()', () => {
    test('should create user successfully', async () => {
      const emailValidatorSpy = jest.spyOn(emailValidator, 'hasInUse')
        .mockImplementationOnce(() => Promise.resolve(false));
      const usersRepositoryWriterSpy = jest.spyOn(usersRepositoryWriter, 'create')
        .mockImplementationOnce(() => Promise.resolve({ success: true }) as any);
      const userfake = {
        name: 'testName',
        email: 'testname@teste.com',
      };
      const data = await createUser.invoke(userfake);
      expect(data).toEqual({ success: true });
      expect(emailValidatorSpy).toHaveBeenCalledWith('testname@teste.com');
      expect(usersRepositoryWriterSpy).toHaveBeenCalled();
    });
  });
});
