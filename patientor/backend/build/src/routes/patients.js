"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const data = patientsService_1.default.getNonSensitiveEntries();
    res.json(data);
});
router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = (0, utils_1.default)(req.body);
    const addedEntry = patientsService_1.default.addEntry(newPatientEntry);
    res.json(addedEntry);
});
exports.default = router;
